# Tipando uma biblioteca
    Temos a possibilidade de tipar uma biblioteca
        
~~~javascript
    import 'styled-components'
    import { defaultTheme } from '../styles/Theme/default'
    
    //Ao pasar o mause em defaultTheme ele exibes tipagem feita automatica

    type ThemeTypes = typeof defaultTheme

    //vamos copias essa tipagem para um typo que vamos criar, Vamos Criar uma Tipagem para o modulo especificado no NPM

    declare module 'styled-components' {
    export interface DefaultTheme extends ThemeTypes {}
    //Vamos sobrescrever uma typagem nova
}
~~~

----

# Hover sem que a div mova para cima
~~~css
    a {
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;
    }
    &:hover {
        border-bottom: 3px solid {(props) => props.them['green-500']};
    }
~~~

# StyledComponent - Usando um component Base reaproveitando o código 
~~~js
    const BaseInput = styled.input`
        background: transparent;
    `

    export const TaskInput = styled(BaseInput)`
~~~

# Criando Lista de Sugestões no input 

~~~jsx
    <TaskInput 
        id="list="
        taskSuggestionsplaceholder="Dê um nome  para seprojeto" 
    />

    <datalist id="taskSuggestions">
      <option value="Projeto 1" />
    </datalist>
~~~

Para tirmos a flecha de input vamos add a propriedade css no input (Funciona apenas no Chrome)

~~~css
    &::-webkit-calendar-picker-indicator {
        display: none !important;
    }
~~~

# OBS sobre estilização em table - border-collapse: collapse; 
Quando vamos colocar uma margin entre as colunas da tabela css vai conta como duar bordas, ou seja 1px em cada bordas, usando
"border-collapse: collapse;" o css conta como apenas uma borda 
