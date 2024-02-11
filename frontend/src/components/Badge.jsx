function Badge({children}) {
  return (
    <div className="cursor-pointer h-[40px] w-[40px] flex items-center justify-center rounded-full border-2 border-white">
        {children}
    </div>
  )
}

export default Badge