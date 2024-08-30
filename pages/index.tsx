import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

// styled-componentsの練習
const Wrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background: gray;
  padding: 10px;
  border-radius: 3px;
`;

const Home: NextPage = () => {
  const [usersName, setUsersName] = useState('');
  const [usersEmail, setUsersEmail] = useState('');
  const [usersPassword, setUsersPassword] = useState('');
  const [users, setUsers] = useState<{ usersName: string; email: string; password: string; }[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // ボタンを押した時の処理
  const onChangeAll = () => {
    const newUser = { usersName, email: usersEmail, password: usersPassword };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    if (typeof window !== 'undefined') {
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
    console.log(localStorage.getItem('users'));
  }

  // モーダルの表示非表示
  const openModal = () => {
    setIsOpen(true);
  }

  const Modal = ({ showFlag }: { showFlag: boolean }) => {
    if (!showFlag) return null;
    return (
      <Wrapper>
        <Content>
          <div>投稿フォーム</div>
          <input id="name" name="name" placeholder='name' value={usersName} onChange={(e) => setUsersName(e.target.value)} />
          <input id="email" name="email" placeholder='email' value={usersEmail} onChange={(e) => setUsersEmail(e.target.value)} />
          <input id="password" name="password" placeholder='password' value={usersPassword} onChange={(e) => setUsersPassword(e.target.value)} />
          <button onClick={onChangeAll}>Submit</button>
 <div></div>
          <button onClick={() => setIsOpen(false)}>モーダルを閉じる</button>
        </Content>
      </Wrapper>
    );
  }

  // ここからローカルストレージの練習
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        try {
          const parsedUsers = JSON.parse(storedUsers);
          if (Array.isArray(parsedUsers)) {
            setUsers(parsedUsers);
          }
        } catch (error) {
          console.error('Failed to parse users from localStorage', error);
        }
      }
    }
  }, []);

  return (
 <div>
      <button onClick={openModal}>ユーザ追加</button>
      <Modal showFlag={isOpen} />
      <h2>登録されたユーザ一覧</h2>
      {users.map((user, index) => (
        <div key={index}>name: {user.usersName} email: {user.email} password: {user.password}</div>
      ))}
      <h2>ローカルストレージに保存されているユーザ一覧</h2>
      {isClient && <div>{localStorage.getItem('users')}</div>}
    </div>
  );
}

export default Home;