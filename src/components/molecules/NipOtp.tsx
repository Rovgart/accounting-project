import React from "react";

function NipOtp() {
  return (
    <InputOTP maxLength={10}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
      </InputOTPGroup>
      <InputOTPGroup>
        <InputOTPSlot index={8} />
        <InputOTPSlot index={9} />
      </InputOTPGroup>
    </InputOTP>
  );
}

export default NipOtp;
