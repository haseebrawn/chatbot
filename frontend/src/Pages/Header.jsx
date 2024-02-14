import React, {useState, useEffect} from 'react';
import UserStatus from './UserStatus';
import '../App.css'

const Header = ({isLoggedIn}) => {
      // UserStatus stat
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Set status to active when the component mounts (chat interface opens)
    setIsActive(true);

    // Clean up when the component unmounts (chat interface closes)
    return () => {
      setIsActive(false);
    };
  }, []);
  return (

            <div className="agent-info-wrapper ">
            <img src="images/Layer-2.jpeg" width={39} height={43} />
                <div>
                    <div>
                        <div className="agent-info-details">
                            <span className="support-agent-designation">Provelopers
                            </span>
                        </div>
                        {isLoggedIn && <UserStatus active={isActive} />}
                    </div>
                </div>
            </div>
  
  )
}

export default Header
