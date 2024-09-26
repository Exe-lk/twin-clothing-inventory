import React from 'react';
import { useRouter } from 'next/router';
import Button from '../components/bootstrap/Button';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const router = useRouter();

  const handleLogout = () => {   
    localStorage.removeItem('user');
    onLogout();
    router.push('/');
  };

  return (
    <div className='text-center mt-3'>
      {/* <Button color='danger' onClick={handleLogout}>
        Logout
      </Button> */}
      <Button
				icon="Logout"
				className="w-100"
				color="dark"
				size="sm"
				tag="button"
				onClick={handleLogout} 
				
			>
			
			</Button>
    </div>
  );
};

export default LogoutButton;
