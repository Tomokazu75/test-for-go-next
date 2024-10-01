'use client';
import { useForm } from "react-hook-form";

const page = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data:any) => {
        console.log(data);
      };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>名前</label>
        <input {...register("name", { required: "名前は必須です。" })} />
        {errors.name && <span>You need name...</span>}
      </div>
      <div>
        <label>Email</label>
        <input
          {...register("email", {
            required: "Emailは必須です。",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "有効なEmailアドレスを入力してください。",
            },
          })}
          />
        {errors.email && <span>You need email...</span>}
      </div>
      <button type="submit">送信</button>
    </form>
  )
}

export default page