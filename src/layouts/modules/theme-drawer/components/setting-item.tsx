function SettingItem({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="text-sm">{label}</div>
      {children}
    </div>
  );
}

export default SettingItem;
