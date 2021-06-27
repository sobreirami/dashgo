import { useState } from 'react';
import NextLink from 'next/link';
import { 
    Box, 
    Flex, 
    Heading, 
    Button, 
    Icon, 
    Table, 
    Thead, 
    Tr, 
    Td, 
    Tbody, 
    Th,
    Checkbox,
    Text,
    useBreakpointValue,
    Spinner,
    Link
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';

import { QueryClient, useQuery } from 'react-query';
import { api } from '../../services/api';
import { getUsers, useUsers } from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { GetServerSideProps } from 'next';

export default function Userlist(/*{ users }*/) {
    const [page, setPage] = useState(1);
    const { data, isLoading, error, isFetched } = useUsers(page/*, {
        initialData: users
    }*/);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
    });

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/${userId}`)

            return response.data;
        }, {
            staleTime: 1000 * 60 * 10
        })
    }

    return (
        <Box>
            <Header />

            <Flex 
                w="100%" 
                my="6" 
                maxW={1480} 
                mx="auto" 
                px={["4","4","6"]}
            >
                <Sidebar />
                

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            { !isLoading && isFetched && <Spinner size="sm" color="gray.500" ml="4" /> }
                        </Heading>

                        <NextLink href="/users/create" passHref>
                            <Button 
                                as="a" 
                                size="sm" 
                                fontSize="sm" 
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Novo
                            </Button>
                        </NextLink>
                    </Flex>
                    
                    { isLoading ? (
                            <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Falha ao obter dados dos usuários</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table
                                colorScheme="whiteAlpha"
                            >
                                <Thead>
                                    <Tr>
                                        <Th px={["4","4","6"]} color="gray.300" width="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>
                                            Usuário
                                        </Th>
                                        {isWideVersion && (
                                            <Th>
                                                Data de cadastro
                                            </Th>
                                        )}
                                        <Th width="8"></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    { data.users.map((user => (
                                        <Tr key={user.id}>
                                            <Td px={["4","4","6"]}>
                                                <Checkbox colorScheme="pink" />
                                            </Td>
                                            <Td>
                                                <Box>
                                                    <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                        <Text fontWeight="bold">
                                                            { user.name }
                                                        </Text>
                                                    </Link>
                                                    <Text fontSize="small" color="gray.300">
                                                        { user.email }
                                                    </Text>
                                                </Box>
                                            </Td>
                                            {isWideVersion && (
                                                <Td>
                                                    { user.createdAt }
                                                </Td>
                                            )}
                                            <Td>
                                            <Button 
                                                as="a" 
                                                size="sm" 
                                                fontSize="sm" 
                                                colorScheme="purple"
                                                leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                                            >
                                                {isWideVersion ? 'Editar' : '' }
                                            </Button>
                                            </Td>
                                        </Tr>
                                    ))) }
                                </Tbody>
                            </Table>

                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    ) }
                </Box>
            </Flex>
        </Box>
    );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     const { users, totalCount } = await getUsers(1);

//     return {
//         props: {
//             users, 
//             totalCount
//         }
//     }
// }