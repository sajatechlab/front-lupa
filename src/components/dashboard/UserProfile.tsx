interface UserProfileProps {
  open: boolean;
  userName: string | null;
  userEmail: string | null;
}

export const UserProfile = ({ open, userName, userEmail }: UserProfileProps) => {
  return (
    <div className="mt-auto pt-4 border-t border-border">
      <div className="flex items-center space-x-3 p-2 bg-card rounded-lg">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
          {userName?.charAt(0) || 'U'}
        </div>
        {open && (
          <div className="text-foreground">
            <p className="font-medium">{userName}</p>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </div>
        )}
      </div>
    </div>
  );
};