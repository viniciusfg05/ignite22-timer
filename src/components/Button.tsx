import { ButtonContainer, ButtonVarient } from "./Button.styles";

interface Buttonprop {
    variant?: ButtonVarient;
}

export function Button({variant = "primary"}: Buttonprop) {
    return (
        <ButtonContainer variant={variant}>Enviar</ButtonContainer>
    )
}