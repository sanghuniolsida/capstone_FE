import React, { useState } from "react";
import Modal from "./Modal";
import PopupContent from "./PopupContent";

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (data) => {
    console.log("사용자 입력 데이터:", data);
    handleCloseModal();
  };

  return (
    <div>
      <h1>메인 페이지</h1>
      <button onClick={handleOpenModal}>팝업 열기</button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PopupContent onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};

export default MainPage;
