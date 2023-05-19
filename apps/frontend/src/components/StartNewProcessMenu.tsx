import { Container, Heading } from '@chakra-ui/react';
import { ListOfAIProfiles } from './ListOfAIProfiles';

export function StartNewProcessMenu() {
  return (
    <>
      <Container
        className='withSlideDownAnimation'
        maxW='full'
        display='relative'
        p={0}
      >
        <Heading as='h3' size='lg' mt='16' mb='8'>
        새 프로세스를 시작하려면 프로필을 선택하세요.
        </Heading>
        <ListOfAIProfiles showAddButton />
      </Container>
    </>
  );
}
