import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { 
    Box, 
    Flex,
    Heading,
    Divider,
    VStack,
    SimpleGrid,
    HStack,
    Button
} from '@chakra-ui/react';
import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
  
  const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória')
        .min(6, 'No minimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais'),
  });

export default function CreateUser() {
    const { register, handleSubmit, formState, errors } = useForm({
        resolver: yupResolver(createUserFormSchema)
      });
    
      const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    
        await new Promise(resolve => setTimeout(resolve, 2000));
    
        console.log(data);
      }

    return (
        <Box>
            <Header />

            <Flex 
                w="100%" 
                my="6" 
                maxW={1480} 
                mx="auto" 
                px="6"
            >
                <Sidebar />
                
                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={["6","8"]}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading 
                        size="lg" 
                        fontWeight="normal"
                    >
                        Criar usuário
                    </Heading>

                    <Divider my="6" borderColor="gray.700" />

                    <VStack spacing="8">
                        <SimpleGrid
                            minChildWidth="240px"
                            spacing={["6","8"]}
                            w="100%"
                        >
                            <Input
                                name="name"
                                label="Nome completo"
                                error={errors.name}
                                ref={register} 
                            />

                            <Input
                                name="email"
                                label="E-mail"
                                type="email" 
                                error={errors.email}
                                ref={register} 
                            />
                        </SimpleGrid> 

                        <SimpleGrid
                            minChildWidth="240px"
                            spacing={["6","8"]}
                            w="100%"
                        >
                            <Input
                                name="password"
                                type="password"
                                label="Senha" 
                                error={errors.password}
                                ref={register} 
                            />

                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Confirmação da senha" 
                                error={errors.password_confirmation}
                                ref={register} 
                            />
                        </SimpleGrid> 
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button
                                colorScheme="pink"
                                type="submit"
                                isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}