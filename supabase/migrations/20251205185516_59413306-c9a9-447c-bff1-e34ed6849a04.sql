-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Access" ON public."Website Contact Form";

-- Create INSERT policy to allow anyone to submit the contact form
CREATE POLICY "Anyone can submit contact form"
ON public."Website Contact Form"
FOR INSERT
WITH CHECK (true);

-- Create SELECT policy to restrict reading to authenticated users only
CREATE POLICY "Only authenticated users can view submissions"
ON public."Website Contact Form"
FOR SELECT
TO authenticated
USING (true);