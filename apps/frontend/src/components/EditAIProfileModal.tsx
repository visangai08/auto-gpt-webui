import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { AIProfile } from '../entities/AIProfile';

interface EditAIProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (profile: AIProfile) => void;
  initialValues: AIProfile;
  isCreatingNewProfile: boolean;
}

export const EditAIProfileModal: React.FC<EditAIProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialValues,
  isCreatingNewProfile,
}) => {
  const [profile, setProfile] = useState<AIProfile>(initialValues);

  useEffect(() => {
    setProfile({ ...initialValues });
    updateGoals();
  }, [initialValues.uid]);

  const updateGoals = (modifyBoforeSaving?: (goals: string[]) => string[]) => {
    let goals = [...profile.goals];
    if (modifyBoforeSaving) {
      goals = modifyBoforeSaving(goals);
    }
    while (goals[goals.length - 1] === '') goals.pop();
    goals.push('');
    setProfile({ ...profile, goals });
  };

  const setGoal = (index: number, value: string) => {
    updateGoals((goals) => {
      goals[index] = value;
      return goals;
    });
  };

  const handleSave = () => {
    profile.goals = profile.goals.filter((goal) => goal !== '');
    onSave?.(profile);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {isCreatingNewProfile ? '새로운 AI 프로필' : 'AI 프로필 편집'} 
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align='stretch' spacing={4}>
            <FormControl>
              <FormLabel>AI에 이름 짓기</FormLabel>
              <Input
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                placeholder='기업가-GPT'
              />
            </FormControl>
            <FormControl>
              <FormLabel>AI의 역할 설명</FormLabel>
              <Textarea
                value={profile.role}
                onChange={(e) =>
                  setProfile({ ...profile, role: e.target.value })
                }
                placeholder='순자산 증가라는 유일한 목표를 가지고 자율적으로 비즈니스를 개발하고 운영하도록
                자율적으로 비즈니스를 개발 및 운영하도록 설계된 인공지능입니다.'
              />
            </FormControl>
            <FormControl>
              <FormLabel>AI를 위한 목표</FormLabel>
              <VStack align='stretch' spacing={2}>
                {profile.goals.map((goal, index) => (
                  <Textarea
                    key={index}
                    value={goal}
                    onChange={(e) => setGoal(index, e.target.value)}
                    onBlur={() => updateGoals()}
                    size='sm'
                  />
                ))}
              </VStack>
            </FormControl>
          </VStack>
        </ModalBody>
        {onSave && (
          <>
            <ModalFooter>
              <Button colorScheme='blue' onClick={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
