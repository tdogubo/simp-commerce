import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../components/ui/button.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form.tsx";
import { Input } from "../components/ui/input.tsx";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group.tsx";
import { Toaster } from "../components/ui/sonner";

const formSchema = z.object({
    firstName: z.string().min(2, { message:"First Name is required"}).max(50),
    lastName: z.string().min(2, { message: "Last Name is required" }).max(50),
    email: z.string().min(2, { message: "Email is required" }).max(50).email({ message: "Invalid email format" }),
    address: z.string().min(10, { message: "Enter full address" }).max(500),
    payment_type: z.enum(["paystack", "flutterwave", "cash"], {
        required_error: "You need to select a payment type.",
    }),
})


const Checkout = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            payment_type: "cash"
        },
    });



    function onSubmit() {
        toast.success("Payment successful", {
            description: "Your order has been created.",

        })
        form.reset();
    }

    return (
        <main className="lg:w-2/3 w-full place-self-center justify-self-center">
            <Toaster position="top-right" richColors />

            <div className=" place-self-start" >
                <NavLink to="/" >
                    <Button variant={"ghost"}>
                        <ArrowLeft />
                    </Button>
                </NavLink>
            </div>
            <h1>Checkout</h1>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-20 " data-testid="checkout-form">
                    <div className="flex md:flex-row flex-col justify-between items-start w-full gap-6">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="lg:w-3/5 w-full">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="lg:w-3/5 w-full">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex md:flex-row flex-col justify-between items-start w-full gap-6">

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="lg:w-3/5 w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="human@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem className="lg:w-3/5 w-full">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="payment_type"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Payment Method</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-col space-y-1"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="cash" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Cash
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="paystack" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Paystack
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="flutterwave" />
                                            </FormControl>
                                            <FormLabel className="font-normal">FlutterWave</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="text-gray-800 w-40">Proceed</Button>
                </form>
            </Form>
        </main>
    )
}

export default Checkout;