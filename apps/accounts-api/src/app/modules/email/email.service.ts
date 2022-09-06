import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env['NX_EMAIL_SERVICE'],
      auth: {
        user: process.env['NX_EMAIL_USER'],
        pass: process.env['NX_EMAIL_PASS'],
      },
    });
  }

  sendWelcomeEmail(toAddress: string) {
    this.transporter.sendMail(
      {
        from: process.env['NX_EMAIL_FROM'],
        to: toAddress,
        subject: 'Welcome to Journey',
        text: `Hi there,\n\nThank you for signing up for Journey!\n\nTo start planning, please visit:\n\n${process.env['NX_ORIGIN_JOURNEY_UI']}\n\nTo view your account, please visit:\n\n${process.env['NX_ORIGIN_ACCOUNTS_UI']}\n\nBest,\n\nThe Journey Team`,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      }
    );
  }
}
