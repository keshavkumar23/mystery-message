"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { verifySchema } from "@/schemas/verifySchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function page() {
    const { toast } = useToast()
    const router = useRouter()
    const params = useParams<{ username: string }>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    // zod implementation
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema)
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(`/api/verify-code`, {
                username: params.username,
                code: data.code
            })
            toast({
                title: "Success",
                description: response.data.message
            })
            setIsSubmitting(false)
            router.replace("/sign-in")
        } catch (error) {
            console.log("Error verifying of user: ", error)
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: "Verification failed",
                description: axiosError.response?.data.message,
                variant: "destructive"
            })
            setIsSubmitting(false)
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <div className="w-full max-w-md p-6 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Verify Your Account
                    </h1>
                    <p className="mb-4">Enter the verification code sent to your email</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter the code" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {
                                isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                                    </>
                                ) : 'Verify'
                            }
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
