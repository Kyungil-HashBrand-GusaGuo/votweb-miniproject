import React from 'react'
import './modal.css';

const VoteCompletionModal = (props) => {

    const { open, close, movie} = props;
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

        </main>
        
      </section>
    ) : null}
  </div>
  )
}

export default VoteCompletionModal