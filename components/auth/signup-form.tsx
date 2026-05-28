'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function SignupForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-6"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Create Account
        </h1>

        <p className="text-sm text-muted-foreground mt-2">
          Signup system will be added with Firebase soon.
        </p>
      </div>

      <Link href="/login">
        <Button className="w-full">
          Go to Login
        </Button>
      </Link>
    </motion.div>
  );
}