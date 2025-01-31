import { ModalTypes } from '@/constants/modals';
import ConfirmAlert, { ConfirmAlertProps } from './modals/ConfirmAlert';
import useModalStore from './useModalStore';
import TeamModal, { TeamModalProps } from './modals/TeamModal';
import ProjectModal, { ProjectModalProps } from './modals/ProjectModal';

const registerModals = () => {
  const { registerModal } = useModalStore.getState();

  registerModal<ConfirmAlertProps>(ModalTypes.CONFIRM_ALERT, ConfirmAlert);
  registerModal<TeamModalProps>(ModalTypes.TEAM_MODAL, TeamModal);
  registerModal<ProjectModalProps>(ModalTypes.PROJECT_MODAL, ProjectModal);
};

export default registerModals;