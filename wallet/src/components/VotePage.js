import React, {useState} from 'react'
import VoteCompletionModal from './VoteCompletionModal';
import WalletCard from './WalletCard';

const VotePage = () => {

  const [modalOpen, setModalOpen] = useState(false);

 	const openModal = () => {
      	console.log('open!')
    setModalOpen(true);
  	};
 	const closeModal = () => {
    	setModalOpen(false);
  	};

  return (
    <div>
      <div>
        <WalletCard/>
      </div>
      <div>
				<button onClick={openModal}>투표완료모달</button>
				<VoteCompletionModal open={modalOpen} close={closeModal} header="Modal heading" />
			</div>
    </div>
  )
}

export default VotePage