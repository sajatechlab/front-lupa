interface UserProfileProps {
  open: boolean;
  userName: string | null;
  userEmail: string | null;
}

export const UserProfile = ({ open, userName, userEmail }: UserProfileProps) => {
  return (
    <div className="mt-auto pt-4 border-t border-[#333333]">
      <div className="flex items-center space-x-3 p-2 bg-[#2A2A2A] rounded-lg">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
          {userName?.charAt(0) || 'U'}
        </div>
        {open && (
          <div className="text-white">
            <p className="font-medium">{userName}</p>
            <p className="text-sm text-neutral-400">{userEmail}</p>
          </div>
        )}
      </div>
    </div>
  );
};