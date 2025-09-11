from schemas.schemas import File
from fastapi import HTTPException, status


class FileService:
    def __init__(self) -> None:
        self.MAX_FILE_SIZE = 5
        self.ALLOWED_EXTENSIONS = {"pdf", "jpg", "png"}
        pass

    def validate_file(self, file: File):
        fileName = file.filename
        if "." not in fileName:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Brak rozszerzenia pliku.",
            )
        extension = fileName.rsplit(".", 1)[1].lower()
        if extension not in self.ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Nieprawidłowy format pliku.",
            )
        if file.size > self.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Plik jest za duży."
            )
