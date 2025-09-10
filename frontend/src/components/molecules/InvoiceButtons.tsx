import previewIcon from "../../assets/preview-icon.svg";
import moreIcon from "../../assets/more-icon.svg";
import downloadIcon from "../../assets/download-icon.svg";

export default function InvoiceButtons() {
  return (
    <div className="flex items-center justify-center gap-2 p-1.5">
      <img src={previewIcon}></img>
      <img src={moreIcon}></img>
      <img src={downloadIcon}></img>
    </div>
  );
}
