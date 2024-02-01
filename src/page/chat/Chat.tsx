import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:4000");
interface Message {
  message: string;
  userId: string;
  timestamp: string; //메세지 전송시간
}
//chatRoom
function Chat({ userId = "aaaa이진형", otherUserId = "bbbb디즈니" }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const roomId = createRoomId(userId, otherUserId);
  useEffect(() => {
    //스토리지로 일단 시도
    //데이터 베이스에 담아서 보관하는 것으로 전환예정
    //테스트
    const storedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    setMessages(storedMessages);
    socket.emit("joinRoom", { roomId });
    socket.on("chat", (data: any) => {
      const messageData = data as Message; //type

      setMessages((prevMessages) => {
        const updateMessages = [...prevMessages, messageData];
        localStorage.setItem("messages", JSON.stringify(updateMessages));
        return updateMessages;
      });
      //로컬스토리지에 내용저장
    });
    return () => {
      socket.emit("leaveRoom", { roomId });
      socket.off("chat");
    };
  }, [roomId]);
  //대화내용보내기
  function sendMessage() {
    if (inputMessage.trim()) {
      const timestamp = new Date().toISOString();
      socket.emit("chat", { roomId, message: inputMessage, userId, timestamp });
      //console.log(inputMessage);
      setInputMessage("");
    }
  }
  //대화내용삭제
  function clearMessages() {
    setMessages([]); // 상태에서 대화 내용 지우기
    localStorage.removeItem("messages"); // 로컬 스토리지에서 대화 내용 지우기
  }
  //
  return (
    <div>
      {/* 메시지 목록 표시 */}
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>
              <b>{msg.userId}</b> :{" "}
            </strong>
            {msg.message}{" "}
            <i style={{ fontSize: "0.8em" }}>
              <br />
              {msg.timestamp}
            </i>
          </div>
        ))}
      </div>
      {/* 메시지 입력 및 전송 인터페이스 : 받아올때는 방에 join 후에 데이터를 받아오는 것에 집중.*/}
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="궁금한 점이 있나요?"
        />
        {/**전송을 할떄는 보내는 것에 집중 */}
        <button onClick={sendMessage}>전송</button>
      </div>
      <div>
        {/* 기존 대화 내용 표시 및 메시지 입력 관련 코드 */}
        {/* 대화 내용 지우기 버튼 */}
        <button onClick={clearMessages}>전체삭제</button>
      </div>
    </div>
  );
}

function createRoomId(userId1: string, userId2: string): string {
  return [userId1, userId2].sort().join("_");
}

export default Chat;
