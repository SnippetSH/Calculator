
export default function Popup({ msg, parentWidths }: { msg: string; parentWidths: number }) {
  return (
    <div
      id="Popup-component"
      className="bg-gray-400/65 flex justify-center items-center py-2 px-1 rounded-3xl"
      style={{ width: `${(parentWidths / 4) * 3}px`,
            minWidth: '190px'    
        }}
    >
      <p className="text-white flex justify-items-center" style={{ fontSize: `15px` }}>
        {msg}
      </p>
    </div>
  );
}
