import { ModalTypes } from '@/constants/modals';
import ConfirmAlert, { ConfirmAlertProps } from './modals/ConfirmAlert';
import useModalStore from './useModalStore';
import TeamModal, { TeamModalProps } from './modals/TeamModal';
import GroupModal, { GroupModalProps } from './modals/GroupModal';
import EnvironmentVariableModal, { EnvironmentVariableModalProps } from './modals/EnvironmentVariableModal';
import AddMemberModal, { AddMemberModalProps } from './modals/AddMemberModal';

type ModalPropsMapping = {
    [ModalTypes.CONFIRM_ALERT]: ConfirmAlertProps;
    [ModalTypes.TEAM_MODAL]: TeamModalProps;
    [ModalTypes.GROUP_MODAL]: GroupModalProps;
    [ModalTypes.ENVIRONMENT_VARIABLE_MODAL]: EnvironmentVariableModalProps;
    [ModalTypes.ADD_MEMBER_MODAL]: AddMemberModalProps;
};

const registerModals = () => {
  const { registerModal } = useModalStore.getState();

  registerModal<ModalTypes.CONFIRM_ALERT>(ModalTypes.CONFIRM_ALERT, ConfirmAlert);
  registerModal<ModalTypes.TEAM_MODAL>(ModalTypes.TEAM_MODAL, TeamModal);
  registerModal<ModalTypes.GROUP_MODAL>(ModalTypes.GROUP_MODAL, GroupModal);
  registerModal<ModalTypes.ENVIRONMENT_VARIABLE_MODAL>(ModalTypes.ENVIRONMENT_VARIABLE_MODAL, EnvironmentVariableModal);
  registerModal<ModalTypes.ADD_MEMBER_MODAL>(ModalTypes.ADD_MEMBER_MODAL, AddMemberModal);
};

export default registerModals;

export {
    type ModalPropsMapping,
}