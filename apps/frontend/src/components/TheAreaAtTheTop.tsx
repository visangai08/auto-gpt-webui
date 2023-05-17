import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import { requiredBackendConfigurationKeys } from '../config/BackendConfigurationKeys';
import { useApiService } from '../hooks/useApiService';
import { useContextStore } from '../store/useContextStore';
import { CommandStringBar } from './CommandStringBar';

export function TheAreaAtTheTop() {
  return <BadConfigurationAlerts />;
}

function BadConfigurationAlerts() {
  const { backendConfiguration } = useContextStore();
  const apiService = useApiService();

  if (!backendConfiguration) {
    return null;
  }

  const missingKeys = requiredBackendConfigurationKeys.filter((key) => {
    return !backendConfiguration[key];
  });

  async function promptAndUpdateEnvVariable(key: string) {
    const value = prompt(`Enter value for ${key}:`);
    if (value !== null) {
      return await apiService.setEnvVariable(key, value);
    }
  }

  return (
    <VStack spacing={4} width='100%'>
      <CommandStringBar />

      <Container maxW='container.xl' display='relative' key='TaskOutputArea'>
        {missingKeys.map((key) => {
          // const value = backendConfiguration[key];
          return (
            <Alert
              key={key}
              borderRadius='md'
              variant='solid'
              status='error'
              mb='2'
              cursor='pointer'
              onClick={() => promptAndUpdateEnvVariable(key)}
              pointerEvents='all'
              className='withShadow'
            >
              <AlertIcon />
              <AlertTitle>
              아직 <code>{key}</code> 환경 변수를 설정하지 않았습니다.
              </AlertTitle>
              <Spacer />
              <AlertDescription fontSize='sm' fontWeight='normal'>
              추가하려면 저를 클릭하세요.
              </AlertDescription>
            </Alert>
          );
        })}
      </Container>
    </VStack>
  );
}
