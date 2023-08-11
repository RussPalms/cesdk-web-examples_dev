import CESDKModal from '../CESDKModal/CESDKModal';

const EditMockupCESDK = ({
  templateName,
  sceneString,
  sceneUrl,
  onSave,
  onClose
}) => {
  return (
    <CESDKModal
      onOutsideClick={onClose}
      configure={async (instance) => {
        instance.engine.editor.setSettingBool('page/title/show', false);
        if (sceneString) {
          await instance.engine.scene.loadFromString(sceneString);
        } else {
          await instance.engine.scene.loadFromUrl(sceneUrl);
        }
      }}
      config={{
        callbacks: {
          onUpload: 'local',
          onSave: (sceneString) => {
            onSave(sceneString);
          },
          onBack: () => {
            onClose();
          }
        },
        role: 'Adopter',
        ui: {
          elements: {
            navigation: {
              title: `${templateName}`,
              action: {
                back: true,
                save: true
              }
            },
            libraries: { template: false }
          }
        }
      }}
    />
  );
};
export default EditMockupCESDK;
