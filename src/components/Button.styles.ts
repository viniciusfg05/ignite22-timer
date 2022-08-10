import styled from "styled-components";

export type ButtonVarient = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
    variant: ButtonVarient
}

const ButtonVarient = {
    primary: 'red',
    secondary: 'green',
    danger: 'yellow',
    success: 'blue'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
    .primary {
        background-color: blueviolet;
    }

    ${props => {
        return `background-color: ${ButtonVarient[props.variant]}`
        // STYLED-COMPONENTS EXECUTA COMO UMA FUNÇÃO SEMPRE QUE FAZEMOS UMA INTERPOLAÇÃO
        // PEGA AS PROPRIEDADE DO BUTTON E PASSA PARA O STYLO
    }}
`