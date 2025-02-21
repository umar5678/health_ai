import React, { useState } from "react";
import { Button, Input, LoadingScreen } from "../../components";
import AuthService from "../../services/AuthService";
import { ApiError } from "../../api/ApiError";

const ForgetPassword = () => {

    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        
        try {
            const res = await AuthService.forgotPassword(email)

            if (res instanceof ApiError) {
                setError(res.errorMessage)

            } else {
                console.log(res)
                setSuccess(true)
            }
            
        } catch (error) {
            setError("Reset psssword errror")
        } finally {
            setLoading(false)
        }
    }

    return (
      <div>
        {loading && (
          <>
            <LoadingScreen />
          </>
        )}

        {success ? (
          <div className="mt-32 md:max-w-md px-2 mx-auto text-center">
            <p>
              We sent you an email to reset your password, Please check your
              inbox
            </p>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="mt-32 md:max-w-md px-2 mx-auto"
            >
              {error && (
                <div className="mb-4 md:max-w-md  mx-auto">
                  <p className="text-center, text-red-600 font-bold p-2 bg-red-500/10 rounded-xl">
                    {error}
                  </p>
                </div>
              )}

              <h1 className="text-xl font-semibold text-stone-900 mb-6">
                Enter Your Email{" "}
              </h1>
              <Input
                label="Email"
                type="email"
                inputClasses="p-2 mt-2"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></Input>

              <Button className="mt-6" type="submit">
                Continue
              </Button>
            </form>
          </>
        )}
      </div>
    );
};

export default ForgetPassword;
