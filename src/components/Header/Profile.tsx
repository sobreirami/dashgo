import { Flex, Text, Box, Avatar } from '@chakra-ui/react';

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Michel Rodrigues</Text>
                    <Text
                        color="gray.300"
                        fontSize="small"
                    >
                        sobreira.michel@gmail.com
                    </Text>
                </Box>
            )}

            <Avatar size="md" name="Michel Rodrigues" src="https://avatars.githubusercontent.com/u/986026?v=4" />
        </Flex>
    );
}