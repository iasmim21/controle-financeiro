import styled, { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export const Container = styled.div`
    margin: 0px;
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    background-color:#13293d;
    flex-direction: column;
    color: black;
`;

export const Extrato = styled.div`
    background-color: white;
    border-radius: 5px;
    width: 70%;
    padding: 20px;
    min-height: 590px;
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

export const Titulo = styled.p`
    font-size: 25px;
    color: white;
    font-weight: bold;
    margin: 15px;
`;

export const ConteudoTitulo = styled.section`
    display: flex;
    justify-content: space-between;
`;

export const Span = styled.span`
    font-size: 25px;
    font-weight: bold;
    color: #13293d;
    
`;

export const ButtomAction = styled.section`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const ButtomInfo = styled.button`
    background-color: #fff;
    color: #0dcaf0;
    cursor: pointer;
    padding: 5px 8px;
    border: 1px solid #0dcaf0;
    border-radius: 5px;
    font-size: 16px;
    :hover{
        background-color: #0dcaf0;
        color: #fff;
    }   
`;

export const ButtomSuccess = styled.button`
    background-color: #fff;
    color: #198754;
    cursor: pointer;
    padding: 5px 8px;
    border: 1px solid #198754;
    border-radius: 5px;
    font-size: 16px;
    :hover{
        background-color: #198754;
        color: #fff;
    }
`;


export const ButtomPrimary = styled.button`
    background-color: #fff;
    color: #006494;
    cursor: pointer;
    padding: 5px 8px;
    border: 1px solid#006494;
    border-radius: 5px;
    font-size: 16px;
    margin-right: 5px;
    :hover{
        background-color: #006494;
        color: #fff;
    }   
`;

export const BtnAntProx = styled.section`
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    margin-bottom: 15px ;
`;

export const BtnCad = styled.section`
    display: flex;
    justify-content: center;
    padding-top: 10px; 
`;

export const Table = styled.table`
    width: 100%;
    text-align: center;
    
    th{
        background-color: #006494;//#2C2E38;
        color: white;
        padding: 10px;
    }
    td{
        background-color: #f6f6f6;
        color: #3e3e3e;
        padding: 8px;   
    }
`;

export const TextDanger = styled.span`
    color: #ec2121;
`;

export const TextSuccess = styled.span`
    color: #24c14a;
`;

export const Text = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif;
    margin: 10px;
`;

export const AlertDanger = styled.p`
    background-color: #f8d7da;
    color: black;
    margin: 15px 0;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
`;

export const AlertSuccess = styled.p`
    background-color: #d1e7dd;
    color: black;
    margin: 15px 0;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
`;

export const Form = styled.form`
    margin: 0px auto;
`;

export const Label = styled.label`
    width: 100%;
    padding: 12px;
    margin-top: 6px;
`;

export const Input = styled.input`
    box-sizing : border-box;
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 6px;
    margin-bottom: 25px;
    font-size: 15px;
`;

export const Select = styled.select`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 6px;
    margin-bottom: 25px;
    font-size: 15px;
`;
