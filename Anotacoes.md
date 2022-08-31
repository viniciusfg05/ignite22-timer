# Pesquisar mais sobre a propriedade/ Compobebte <Outlet /> do react-router-dom

# Bibliotecas de validações: yup, joi e zod 

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

# StyledComponent - Usando um component Base reaproveitando o código (No styled-components, como podemos utilizar outros componentes estilizados como base para novos componentes)
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


# Para criar uma propriedade no styledcomponets

Crio um propriedade e passo como generico.
No codigo abaixo estamos criando um thema variavel para propriedadem STATUS_COLORS define que a propriedade vai ter determina cor, baseado do DefaultTheme.

~~~~js
const STATUS_COLORS = {
  yellow: 'yellow-500',
  red: 'red-500',
  green: 'green-500',
} as const

interface StatusProps {
  statusColor: 'yellow' | 'red' | 'green';
  statusColor: 'yellow' | 'red' | 'green';
statusColor: keyof typeof STATUS_COLORS; // pega as chaves de yellow red green de STATUS_COLORS | antes statusColor: 'yellow' | 'red' | 'green';
}
export const Status = styled.span<StatusProps>`
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};;
  }
`
~~~~

# as const oq significa?
Quando passomos um objeto informando que yellow: 'yellow-500' o TS entende que 'yellow' é um string qualquer, que pode varias, usando o 'as cont' ele entende que 'yellow' é 'yellow-500'

~~~~js
const STATUS_COLORS = {
  yellow: 'yellow-500',
  red: 'red-500',
  green: 'green-500',
} as const
~~~~


##################################

# FORMULARIOS

## Controlled VS Uncontrolled
    * Controlled: Fazemos um State() para ter a atualização de cada tecla digitada pelo usuario "Onchange". Mantemos um tempo real a informação digitada.

    * Uncontrolled: Buscamos a informação do valor somente quando precisar dela. Criando um function que executa após do submit, e a informação digitada é pega pelo "event.target.task.value". Lembrando que .task.value o "task" é o id do input.

## Integrando o react-hook-form no projeto
    * "register" é um função que retorna basicamente as propriedade do input como por ex. Onchange, OnBlur, OnFocus e etc. Para lidar com as validações. Como existe varios metodo vamos add um spreedOperacion no componet de input

    *valueAsNumber um propriedade do register para tranformar string em number 

~~~tsx
  const { register, handleSubmit } = useForm()

  return (
    <TaskInput
    {...register('task')} // no   parao input, tira o id que    registerj
    ||
    {...register('minutesAmount', { valueAsNumber: true })} 
    />
  )
~~~

    * "handleSubmit": para usarmos o handleSubmit, vamos criar um função que será executada como uma propriedade da função hadleSubmit 

~~~tsx
  function handleCreateNewCyrcle(data: any) {
    // data recebe os dados do input
  }

  return (
    <form onSubmit={handleSubmit(handleCreateNewCyrcle)} />
  )
~~~

    * "watch": serve como o Onchange, para obervar a digitação no input

~~~tsx
    const isInputFilled = watch('task')
~~~

### Trabalhando com validações no react-hook-form
    Por padrão o react-hook-form não trabalha com validações, pois já existem bibliotecas que fazem isso. Neste projeto vamos ultilizar a "zod".

    * "@hookform/resolvers": E Para ultilizarmos essa bibiloteca vamos precisar instalar outra bibiloteca, chamada "@hookform/resolvers", que nos permite integrar a as bibiloteca de validações com react-hook-form.

~~~tsx
    import { zodResolver } from '@hookform/resolvers/zod';
    import * as zod from 'zod' // usamos ess sitaxe, quando a bibioteca não exporta default

    const newCycleFormValidationSchema = zod.object({
  //Validando um objeto por isso, zod.object
      task: zod.string().min(5, "Informe a tarefa"),
      minutesAmount: zod.number().min(5, 'Mens. Error').max(60, 'Mens. Error')
    })

    export function Home() {
        const { register, handleSubmit, watch, formState } = useForm({
          resolver: zodResolver(newCycleFormValidationSchema)
        })

        // console no erros
        console.log(formState.errors);

    }
~~~

# React-hook-form Context

React-hook-form oferece um contexto proprio. Para isso vamos criar uma const e desestruturar o useForm com a constante criada.
Após isso vamos usar a função FormProvider do react-hook-form para passar como spreedOperacion a constante de useForm.

Para pegar os dados do provider vamos usar a função useFormContext e desestruturar a propriedade que queremos. 

Home.tsx
~~~js
  const useFormProps = useForm<NewCycleFormProps>()

  const { handleSubmit, watch, reset } = useFormProps

  <FormProvider {...useFormProps}>
    <NewCycleForm />
  </FormProvider>
~~~
NewCycleForm.tsx
~~~js
  const { register } = useFormContext()

  <TaskInput {...register('task')} /*nome para o input, tira o id quregister*/  />
~~~


# Integrando o TS com as validações

No useForm podemos passar valores padroes inicial para o input em questão a propriedade "defaultValues"
Para ter uma integração com o TS vamos passar a interface como "<>"

~~~tsx
      const { register, handleSubmit, watch } = useForm<NewCycleFormProps>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
          task: '',
          minutesAmount: 0,
        }
      }) 
~~~

# Funcionabilidade do ZOD: "infer"

No zod, conseguimos quando vazemos a validação do input como por ex. 
~~~tsx
    const newCycleFormValidationSchema = zod.object({
  //Validando um objeto por isso, zod.object
      task: zod.string().min(5, "Informe a tarefa"),
      minutesAmount: zod.number().min(5, 'Mens. Error').max(60, 'Mens. Error')
    })
~~~
O zod altomaticamente entende que 'task' e 'minutesAmount' é um propriedade. 
Para isso vamos usar a propriedade "infer"

~~~tsx
type NewCycleFormProps = zod.infer<typeof newCycleFormValidationSchema>
~~~

Sempre que queremos referencia uma variaver JS dentro do TS precisamos usar o "typeof"


# Alterção de valores do useState

Sempre que vamos atualizar um valor que depende do valor anterior precisamos usar o formato de () =>

~~~tsx
// Errado
setCicles([...cycles, newCycle])

// Forma corrta 
setCicles((state) => [...state, newCycle])
~~~

# Usando o SetInterval 

Como o setInterval não é preciso, vamos compara a data que foi criado o Cycle com a data atual, assim descobrindo quando tempo se passaram: Faremos isso com a ajuda da biblioteca "date-fns"

~~~js
import { differenceInSeconds } from 'date-fns' //calcula a diferença de duas data em segundos

  useEffect(() => {
    // Se tiver um ciclo ativo, vou da um setInterfvalo
    if(activeCycle) {
      setInterval(() => {
        // diferença da data atual com a data do startCicle
        setAmountSecondsPassed(differenceInSeconds( new Date(), activeCycle.startDate ))

      }, 1000)
    }
  }, [activeCycle])
~~~


# Sobre useEffect

O useEffect pode tem uma função de retorna que no caso do cicle quando criamos um novo ciclo em seguida, ele nunca resetará as informações ateriores. Vamos ultilizar essas função de returno para essa finalidade

~~~js
  useEffect(() => {
    let interval: number;

    if(activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds( new Date(), activeCycle.startDate ))

      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])
~~~

# Converter um variavel undefined | Valor em booleano
~~~js
  <TaskInput
    list="taskSuggestions"
    disabled={!!activeCycle}
    placeholder="Dê um nome para seu projeto"
    {...register('task')} // nome para o input, tira o id que o register  
  />
~~~

### Quando queremos enviar uma função setfuncao do useState, vamos criar uma função que atualizar ele e passar a função por contexto 

~~~tsx  
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  <CycleContext.Provider value={{ setSecondsPassed }} />
~~~  

# Context - Abservações sobre o assunto

Vamos criar um arquivo que vai conter todos os arquivos "CyclesContextProvider" do contexto e passasr para o App.tsx

~~~js
App.tsx
  <CyclesContextProvider>
    <Router />
  </CyclesContextProvider>
  ~~~

  Children - Quando criamos o contexto e passamos para o App.tsx, terá outro componente dentro do contexto que criamos, no caso o "Router", e quando passamos ao dentro do contextProvider "CyclesContextProvider", nos precisamos falr dentro do return, a onde o componente filho "Router" vai ser acoplado, chamamos isso de children.

  Error: O tipo '{ children: Element; }' não tem propriedades em comum com o tipo 'IntrinsicAttributes'.

~~~js
interface CycleContextProviderProps {
  children: ReactNode // qualquer html valido
}

  export function CyclesContextProvider({ children }: CycleContextProviderProps) {

      return (
        <CycleContext.Provider value={{ }} >
            { children }
        </CycleContext.Provider>
    )
  }
~~~