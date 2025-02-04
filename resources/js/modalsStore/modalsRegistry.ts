import { ModalTypes } from '@/constants/modals';
import ConfirmAlert, { ConfirmAlertProps } from './modals/ConfirmAlert';
import useModalStore from './useModalStore';
import TeamModal, { TeamModalProps } from './modals/TeamModal';
import ProjectModal, { ProjectModalProps } from './modals/ProjectModal';
import EnvModal, { EnvModalProps } from './modals/EnvModal';

type ModalPropsMapping = {
    [ModalTypes.CONFIRM_ALERT]: ConfirmAlertProps;
    [ModalTypes.TEAM_MODAL]: TeamModalProps;
    [ModalTypes.PROJECT_MODAL]: ProjectModalProps;
    [ModalTypes.ENV_MODAL]: EnvModalProps;
};

const registerModals = () => {
  const { registerModal } = useModalStore.getState();

  registerModal<ModalTypes.CONFIRM_ALERT>(ModalTypes.CONFIRM_ALERT, ConfirmAlert);
  registerModal<ModalTypes.TEAM_MODAL>(ModalTypes.TEAM_MODAL, TeamModal);
  registerModal<ModalTypes.PROJECT_MODAL>(ModalTypes.PROJECT_MODAL, ProjectModal);
  registerModal<ModalTypes.ENV_MODAL>(ModalTypes.ENV_MODAL, EnvModal);
};

export default registerModals;

export {
    type ModalPropsMapping,
}