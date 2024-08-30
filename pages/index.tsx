import type { NextPage } from 'next';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
  const [users, setUsers] = useState<{ usersName: string; email: string; password: string; date: string}[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const initialDate = new Date();
  const [startDate, setStartDate] = useState<Date | null>(initialDate);
  const handleChange = (date: Date | null) => {
    setStartDate(date);
  };
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<DatePicker>(null);

  // ボタンを押した時の処理
  const onChangeAll = () => {
    if (nameInputRef.current && emailInputRef.current && passwordInputRef.current) {
      const newUser = {
        usersName: nameInputRef.current.value,
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
        date: dateInputRef.current?.props.selected?.toString() || '',
      };
      setUsers([...users, newUser]);
      if (typeof window !== 'undefined') {
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
      }
      setIsOpen(false);
      console.log(localStorage.getItem('users'));
    }
  };

  const allDelete = () => {
    setUsers([]);
    localStorage.removeItem('users');
  }

  // モーダルの表示非表示
  const openModal = () => {
    setIsOpen(true);
  };

  const Modal = ({ showFlag }: { showFlag: boolean }) => {
    if (!showFlag) return null;
    return (
      <Wrapper>
        <Content>
          <div>投稿フォーム</div>
          <input 
          ref={nameInputRef} 
          id="name" 
          name="name" 
          placeholder="name" 
          />
          <input
            ref={emailInputRef}
            id="email"
            name="email"
            placeholder="email"
          />
          <input
            ref={passwordInputRef}
            id="password"
            name="password"
            placeholder="password"
            type="password"
          />
          <DatePicker
            ref={dateInputRef}
            selected={startDate}
            id = "date"
            name = "date"
            onChange={handleChange}
    />
           <button onClick={onChangeAll}>Submit</button>
 <div></div>
          <button onClick={() => setIsOpen(false)}>モーダルを閉じる</button>
        </Content>
      </Wrapper>
    );
  };

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
      
      <Modal showFlag={isOpen} />
      <h2>登録されたユーザ一覧　　<button onClick={openModal}>＋</button></h2>
      {users.map((user, index) => (
        <div key={index}>name: {user.usersName} email: {user.email} password: {user.password} date: {user.date}</div>
      ))}
      <button onClick={allDelete}>全件削除</button>
      <h2>ローカルストレージに保存されているユーザ一覧</h2>
      {isClient && <div>{localStorage.getItem('users')}</div>}
</div>
  );
}

export default Home;