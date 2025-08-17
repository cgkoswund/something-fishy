import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const usePlayerStore = create(
  subscribeWithSelector((set) => {
    return {
      /****** STATE ****** */
      playerPosition: [5, 80, -420],
      isPlayerMoving: false,
      dirVec: { x: 0, y: 0 },
      oldQuat: { w: 1, x: 0, y: 0, z: 0 },
      newQuat: { w: 1, x: 0, y: 0, z: 0 },
      fishQuat: { w: 1, x: 0, y: 0, z: 0 },
      torque: { x: 0, y: 0, z: 0 },
      isDraggingMouse: false,

      /**
       *
       * SETTERS
       *
       */

      setDirVec: (newDirVec: { x: number; z: number }) => {
        set((state: any) => {
          if (state.dirVec.x !== newDirVec.x || state.dirVec.z !== newDirVec.z)
            return { dirVec: newDirVec };
          return {};
        });
      },
      setPlayerPosition: (newPlayerPos: {
        x: number;
        y: number;
        z: number;
      }) => {
        set(
          (state: { playerPosition: { x: number; y: number; z: number } }) => {
            if (
              state.playerPosition.x !== newPlayerPos.x ||
              state.playerPosition.y !== newPlayerPos.y ||
              state.playerPosition.z !== newPlayerPos.z
            )
              return { playerPosition: newPlayerPos };
            return {};
          }
        );
      },
      setIsFishMoving: (isFishMovingNew: boolean) => {
        set((state: any) => {
          if (state.isFishMoving !== isFishMovingNew)
            return { isFishMoving: isFishMovingNew };
          return {};
        });
      },

      //set newQuat
      setNewQuat: (newQuat: { w: number; x: number; y: number; z: number }) => {
        set((state: any) => {
          if (
            state.newQuat.w !== newQuat.w ||
            state.newQuat.x !== newQuat.x ||
            state.newQuat.y !== newQuat.y ||
            state.newQuat.z !== newQuat.z
          )
            return { newQuat: newQuat };
          return {};
        });
      },
      //set torque
      setTorque: (torque: { x: number; y: number; z: number }) => {
        set((state: any) => {
          if (
            state.torque.x !== torque.x ||
            state.torque.y !== torque.y ||
            state.torque.z !== torque.z
          )
            return { torque: torque };
          return {};
        });
      },
      //set isDraggingMouse
      setIsDraggingMouse: (isDraggingMouseNew: boolean) => {
        set((state: any) => {
          if (state.isDraggingMouse !== isDraggingMouseNew)
            return { isDraggingMouse: isDraggingMouseNew };
          return {};
        });
      },

      /***************** */
    };
  })
);

export default usePlayerStore;
