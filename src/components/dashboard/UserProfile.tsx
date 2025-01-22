interface UserProfileProps {
  open: boolean;
  userName: string | null;
  userEmail: string | null;
}

export const UserProfile = ({ open, userName, userEmail }: UserProfileProps) => {
  return (
    <div className="mt-auto pt-4 border-t border-[#9b87f5]/10">
      <div className="flex items-center space-x-3 p-2 bg-[#2A2F3C] rounded-lg">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] flex items-center justify-center text-white font-bold">
          {userName?.charAt(0) || 'U'}
        </div>
        {open && (
          <div className="text-white">
            <p className="font-medium">{userName}</p>
            <p className="text-sm text-[#9b87f5]/70">{userEmail}</p>
          </div>
        )}
      </div>
    </div>
  );
};