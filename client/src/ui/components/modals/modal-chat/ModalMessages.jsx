import styles from "./styles.module.scss";
import ChatButton from "../../buttons/ChatButton";
import CardMessage from "../../cards/card-chats/CardMessage";
import { useState, useRef, useEffect, useCallback } from "react";
import useWsCaregiver from "@src/common/utils/websocket/useWsCaregiver";
import useWsOwner from "@src/common/utils/websocket/useWsOwner";
import CardInput from "../../cards/card-chats/CardInput";
import Cross from "@icons/cross.svg?react";
import handleImageUpload from "../../cloudinary/imageUpload";

const ModalMessages = ({
  imgSrc,
  type,
  onClick,
  role,
  data = {
    id: 0,
    caregiverId: 0,
    ownerId: 0,
    ownerName: "Juan",
    caregiverName: "Pedro",
    ownerAvatar: "https://www.abc.es/Media/201410/09/Perro--644x362.jpg",
    caregiverAvatar: "https://www.abc.es/Media/201410/09/Perro--644x362.jpg",
    messageChats: [],
  },
}) => {
  const [message, setMessage] = useState({
    type: "message",
    message: "",
    image: null,
    isOwner: false,
    isCaregiver: false,
    createdAt: "",
  });
	const [isLoading, setIsLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null);
  const [imageLocal, setImageLocal] = useState(null);

  const chatContainerRef = useRef(null);

  const { sendMessageOwner } = useWsOwner();
  const { sendMessageCaregiver } = useWsCaregiver();

  const convertMsg = (msg) => msg.replace(/\n/g, "<br>");

  const handleSendMessage = useCallback(async () => {
    if (message.message.length <= 0 && !imageFile) return;
		if(isLoading) return;
    let imageUrl = null;
    if (imageFile) {
			setIsLoading(true)
      imageUrl = await handleImageUpload(imageFile);
    }
    if (role === "owner") {
      sendMessageOwner({
        ...message,
        message: convertMsg(message.message),
        image: imageUrl,
        role,
        isOwner: true,
        isCaregiver: false,
        caregiverId: data.caregiverId,
        ownerId: data.ownerId,
      });
    } else if (role === "caregiver") {
      sendMessageCaregiver({
        ...message,
        message: convertMsg(message.message),
        image: imageUrl,
        role: role,
        isCaregiver: true,
        isOwner: false,
        caregiverId: data.caregiverId,
        ownerId: data.ownerId,
      });
    }
    setMessage({ ...message, message: "" });
    setImageFile(null);
    setImageLocal(null);
		setIsLoading(false)
  }, [
    message,
    role,
    data.caregiverId,
    data.ownerId,
    sendMessageOwner,
    sendMessageCaregiver,
    imageFile,
		isLoading
  ]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [handleSendMessage]);

  const handleDeleteImage = () => {
    setImageFile(null);
    setImageLocal(null);
  };

	const styleLoading = isLoading ? styles.isLoading : ''


  return (
    <div className={`${styles.mainContainerChat} ${styleLoading}`}>
      <section className={styles.mainContainerSection}>
        <ChatButton text={"Chats"} onClick={onClick} />
        <figure>
          <img src={imgSrc} alt={name} />
          <figcaption>
            <h3>{type}</h3>
          </figcaption>
        </figure>
      </section>
      <div ref={chatContainerRef} className={styles.mainContainerMessages}>
        {data.messageChats.map((message, index) => {
          return (
            <CardMessage
              key={index}
              data={message}
              caregiverName={data.caregiverName}
              ownerName={data.ownerName}
              role={role}
            />
          );
        })}
        {imageLocal && (
          <div className={styles.containerImgLocal}>
            <Cross onClick={handleDeleteImage} />
            <img
              src={imageLocal}
              alt="image"
              className={styles.imgLocal}
            />{" "}
          </div>
        )}
      </div>
      <CardInput
        value={message.message}
        setValue={(value) => setMessage({ ...message, message: value })}
        sendMessage={handleSendMessage}
        setImageLocal={setImageLocal}
        setImageFile={setImageFile}
				isLoading={isLoading}
      />
    </div>
  );
};

export default ModalMessages;
