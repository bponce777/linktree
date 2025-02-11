import { BlockInfo } from "./BlockInfo";
import { EditBackground } from "./EditBackground";
import { ProfileImage } from "./ProfileImage/ProfileImage";
import { ProfileInfoTtypes } from "./ProfileInfo.types";

export function ProfileInfo(props: ProfileInfoTtypes) {
  const { onReload } = props;
  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <div className="flex flex-row pb-lg space-x-sm items-center justify-between">
        <ProfileImage />
        <BlockInfo />
        <EditBackground onReload={onReload} />
      </div>
    </div>
  )
}
