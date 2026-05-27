import React, {
  useEffect,
  useState,
  useRef
} from "react";

import SockJS from "sockjs-client";

import {
  Client
} from "@stomp/stompjs";

import axios from "../utils/axiosInstance";

import {
  useParams
} from "react-router-dom";

import {
  FaPaperPlane,
  FaUserMd
} from "react-icons/fa";

function Message() {

  const { id } =
        useParams();

  const senderId =
        Number(
          localStorage.getItem("id")
        );

  const receiverId =
        Number(id);

  const role =
        localStorage.getItem("role");

  const [messages,
        setMessages] =
        useState([]);

  const [msg,
        setMsg] =
        useState("");

  const [client,
        setClient] =
        useState(null);

  const bottomRef =
        useRef();

  // =========================
  // FETCH OLD MESSAGES
  // =========================

  const fetchMessages =
  async () => {

    try {

      const response =
            await axios.get(

`/messages?senderId=${senderId}&receiverId=${receiverId}`

      );

      setMessages(
        response.data
      );

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    if(senderId && receiverId){

      fetchMessages();
    }

  }, [senderId, receiverId]);


  useEffect(() => {

    const stompClient =
          new Client({

      webSocketFactory: () =>

        new SockJS(
          "http://localhost:8080/ws"
        ),

      reconnectDelay: 5000,

      onConnect: () => {

        stompClient.subscribe(

          `/topic/messages/${senderId}`,

          (message) => {

            const newMessage =
                  JSON.parse(
                    message.body
                  );

            setMessages((prev) => {

              const exists =
                    prev.find(

                (m) =>

                  m.id ===
                  newMessage.id
              );

              if(exists)
                return prev;

              return [

                ...prev,

                newMessage
              ];
            });
          }
        );
      }
    });

    stompClient.activate();

    setClient(
      stompClient
    );

    return () => {

      stompClient.deactivate();
    };

  }, [senderId]);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth"
    });

  }, [messages]);


  const sendMessage = () => {

    if(!msg || !client)
      return;

    const chatMessage = {

      senderId,
      receiverId,

      senderName:
        role,

      messages:
        msg
    };

    client.publish({

      destination:
        "/app/private-message",

      body:
        JSON.stringify(
          chatMessage
        )
    });

    setMsg("");

    setTimeout(() => {

      fetchMessages();

    }, 300);
  };

  return (

<div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#071330] to-[#0f172a] flex justify-center items-center px-5 py-8">

<div className="w-full max-w-[1500px] h-[90vh] bg-white/10 backdrop-blur-xl border border-cyan-500/20 rounded-[35px] overflow-hidden shadow-[0_0_40px_rgba(0,255,255,0.1)] flex">

<div className="hidden lg:flex w-[320px] bg-black/20 border-r border-white/10 flex-col">

{/* TOP */}

<div className="p-8 border-b border-white/10">

<h1 className="text-4xl font-black text-white">

Chats

</h1>

<p className="text-gray-400 mt-2">

Premium Messaging

</p>

</div>

{/* USER */}

<div className="p-5">

<div className="bg-cyan-500/10 border border-cyan-500/20 rounded-[25px] p-5 flex items-center gap-4">

<div className="w-16 h-16 rounded-full bg-cyan-500 flex justify-center items-center text-3xl text-white">

<FaUserMd />

</div>

<div>

<h2 className="text-white text-2xl font-bold">

Doctor

</h2>

<p className="text-green-400">

Online

</p>

</div>

</div>

</div>

</div>

{/* ========================= */}
{/* RIGHT CHAT */}
{/* ========================= */}

<div className="flex-1 flex flex-col">

{/* TOPBAR */}

<div className="h-[100px] border-b border-white/10 px-8 flex items-center justify-between bg-black/10">

<div className="flex items-center gap-5">

<div className="w-16 h-16 rounded-full bg-cyan-500 flex justify-center items-center text-white text-3xl">

👨‍⚕️

</div>

<div>

<h1 className="text-3xl font-black text-white">

Doctor Chat

</h1>

<p className="text-green-400">

Online Now

</p>

</div>

</div>

</div>

{/* ========================= */}
{/* CHAT AREA */}
{/* ========================= */}

<div className="flex-1 overflow-y-auto p-8 space-y-6">

{

messages.map((m, index) => (

<div

key={index}

className={`flex ${
m.senderId === senderId
? "justify-end"
: "justify-start"
}`}
>

<div

className={`max-w-[500px] px-6 py-5 rounded-[28px] shadow-2xl ${
m.senderId === senderId
? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
: "bg-white/10 backdrop-blur-md text-white border border-white/10"
}`}
>

<h1 className="font-black text-lg">

{m.senderName}

</h1>

<p className="mt-2 text-lg leading-8">

{m.messages}

</p>

<p className="mt-3 text-sm opacity-70">

{m.time}

</p>

</div>

</div>
))
}

<div ref={bottomRef}></div>

</div>

{/* ========================= */}
{/* INPUT */}
{/* ========================= */}

<div className="p-6 border-t border-white/10 bg-black/10">

<div className="flex gap-5">

<input

type="text"

placeholder="Type your message..."

value={msg}

onChange={(e)=>

setMsg(
e.target.value
)
}

onKeyDown={(e) => {

if(e.key === "Enter"){

sendMessage();
}
}}

className="flex-1 h-[70px] bg-white/10 border border-white/10 rounded-[22px] px-6 text-white text-xl outline-none focus:border-cyan-400"
/>

<button

onClick={sendMessage}

className="w-[80px] rounded-[22px] bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 flex justify-center items-center text-white text-2xl shadow-xl"
>

<FaPaperPlane />

</button>

</div>

</div>

</div>

</div>

</div>
  );
}

export default Message;