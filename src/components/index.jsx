import styled from 'styled-components';

export const Deck = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  width: 75%;
  background-color: #fff;
  border-radius: 5px;
  font-size: 2rem;
`;

export const QuestionCardStyle = styled(Title)`
  padding: 20px;
  border: 1px solid #8080808a;
  border-radius: 5px;
`;

export const Quiz = styled(Title)`
  align-items: center;
`;

export const CardTitle = styled(Title)`
  background-color: #000000b5;
  padding: 20px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-weight: bold;
  text-align: center;
  color: white;
  margin: 0;
  width: 100%;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DeleteBtnBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-top: 0;
`;

export const Button = styled.button`
  padding: 10px;
  border-radius: 5px;
`;

export const DeleteBtn = styled(Button)`
  border: none;
  font-weight: bold;
  font-size: 1.2rem;
`;

export const AddCard = styled(Button)`
  width: 75%;
`;

export const ChoiceBtn = styled(Button)`
  background-color: #0089ff;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding: 10px 0;
  border-radius: 5px;
  color: white;
  font-size: 1.5rem;
`;

export const Submit = styled.input`
  background-color: #0089ff;
  width: 75%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding: 10px 0;
  border-radius: 5px;
  color: white;
  font-size: 1.5rem;
`;

export const ReportCard = styled.div`
  color: black;
  font-size: 2rem;
`;

export const Results = styled.div`
  padding-top: 5px;
`;

export const Emoji = styled(Results)`
  text-align: center;
`;

export const ResultQuestion = styled(Results)`
  font-weight: bold;
  font-size: 2.5rem;
`;

export const MyAnswer = styled.div`
  color: ${props => (props.myAnswer ? 'green' : 'red')};
`;

export const NavbarStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #0095ff;
  padding: 5px;
  align-items: center;
  color: white;
`;

export const SearchBar = styled.input`
  height: 30px;
  width: 1000px;
  border-radius: 10px;
`;

export const MyQuestion = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

export const ChoiceLengthBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const CustomChoices = styled.div`
  display: flex;
  justify-content: space-between;
`;
