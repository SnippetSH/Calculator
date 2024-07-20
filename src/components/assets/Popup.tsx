
export default function Popup({ msg, parentWidths, isBright, onClick }: { msg: string; parentWidths: number, isBright: boolean, onClick?: () => void }) {
  return (
    <div
      id="Popup-component"
      className={`${isBright ? "bg-gray-600" : "bg-gray-400/65" } flex justify-center items-center py-2 px-1 rounded-3xl`}
      style={{ width: `${(parentWidths / 4) * 3}px`,
            minWidth: '190px'    
        }}
      onClick={() => onClick && onClick()}
    >
      <p className="text-white flex justify-items-center" style={{ fontSize: `15px` }}>
        {msg}
      </p>
    </div>
  );
}
