import React from 'react'
import './modal.css';

const VoteCompletionModal = (props) => {

    const { open, close } = props;
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
    {open ? (
      <section>
        <header>
          <button className="close" onClick={close}>
            &times;
          </button>
        </header>
        <main className='videocontainer'>
            <div>
                <h1>투표완료</h1>
            </div>
            <div>
                <div>
                    
                </div>
            </div>
        </main>
        
      </section>
    ) : null}
  </div>
  )
}

export default VoteCompletionModal