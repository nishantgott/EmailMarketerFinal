import formData from 'form-data';
import Mailgun from 'mailgun.js';
import express from 'express';
import mongoose from 'mongoose';
import emailTemplatesModel from '../models/emailtemplate.js'
import messageModel from '../models/messageModel.js'

export const sendThisEmailController = async (req, res) => {
    try {
        const mailgun = new Mailgun(formData);
        const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
        const { recepient, subject, body, campaignName, template } = req.body;

        // console.log('sending email...\n');

        // Send email via Mailgun
        const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
            from: `Excited User <mailgun@${process.env.MAILGUN_DOMAIN}>`,
            to: [recepient],
            subject: subject,
            text: body,
            html: `<h1>${body}</h1>`
        });

        // Log the response from Mailgun
        // console.log(msg);

        const messageId = msg.id;
        // console.log(`Message ID: ${messageId}`);

        const message = new messageModel({ campaign_name: campaignName, open: "no", click: "no", template, message_id: messageId }).save();
        res.status(200).send({ message: 'Email sent successfully', messageId: messageId });
    } catch (error) {
        // console.log(error);
        res.status(500).send('Email sending went wrong');
    }
};

export const addTemplateController = async (req, res) => {
    try {
        const { subject, body } = req.body;
        const template = new emailTemplatesModel({ subject, body }).save();
        res.status(200).send({ template, message: 'Template added successfully' });
    } catch (error) {
        // console.log(error)
        res.status(500).send('Adding template went wrong');
    }
}

export const editTemplateController = async (req, res) => {
    try {
        const { id, subject, body } = req.body;
        const template = await emailTemplatesModel.updateOne({ _id: id }, { $set: { subject: subject, body: body } });
        res.status(200).send({ template, message: 'Template added successfully' });
    } catch (error) {
        // console.log(error)
        res.status(500).send('Adding template went wrong');
    }
}

export const getTemplatesController = async (req, res) => {
    try {
        // console.log('doing');
        const templates = await emailTemplatesModel.find({});
        res.status(200).send({
            templates, message: 'Templates retrieved'
        })
    } catch (error) {
        // console.log(error)
        res.status(500).send('Retrieving templates went wrong');
    }
}

export const deleteTemplateController = async (req, res) => {
    try {
        const { id } = req.body;
        const template = await emailTemplatesModel.findByIdAndDelete(id);
        res.status(200).send({
            template, message: 'Templates deleted'
        })
    } catch (error) {
        // console.log(error)
        res.status(500).send('Deleting template went wrong');
    }
}

export const getTemplateFromIdController = async (req, res) => {
    try {
        const { id } = req.body;
        // console.log(id);
        const template = await emailTemplatesModel.findById(id);
        res.status(200).send({ template });
    } catch (error) {
        // console.log(error)
        res.status(500).send('Getting template from id went wrong');
    }
}