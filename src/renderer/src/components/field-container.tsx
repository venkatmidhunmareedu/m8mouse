const FieldContainer = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <div className="w-full my-2">
      <div className="flex flex-col space-y-3 text-xs">{children}</div>
    </div>
  )
}

export default FieldContainer
