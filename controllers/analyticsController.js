import messageModel from "../models/messageModel.js";

export const getTotalController = async (req, res) => {
    try {
        const { name } = req.body;
        const count = await messageModel.countDocuments({ campaign_name: name });
        res.status(200).send({ message: "Success", count });
    } catch (error) {
        // console.log(error);
        res.status(500).send('Getting total mails went wrong');
    }
}

export const getOpenController = async (req, res) => {
    try {
        const { name } = req.body;
        const count = await messageModel.countDocuments({ campaign_name: name, open: "yes" });
        res.status(200).send({ message: "Success", count });
    } catch (error) {
        // console.log(error);
        res.status(500).send('Getting open mails went wrong');
    }
}

export const getClickController = async (req, res) => {
    try {
        const { name } = req.body;
        const count = await messageModel.countDocuments({ campaign_name: name, click: "yes" });
        res.status(200).send({ message: "Success", count });
    } catch (error) {
        // console.log(error);
        res.status(500).send('Getting clicked mails went wrong');
    }
}

export const getCampaignTemplatesController = async (req, res) => {
    try {
        const { name } = req.body;
        const campaignTemplates = await messageModel.find({ campaign_name: name }).distinct('template');
        res.status(200).send({ message: "Success", campaignTemplates });
    } catch (error) {
        // console.log(error);
        res.status(500).send('Getting campaign templates went wrong');
    }
}

export const getCampaignTemplateOpenController = async (req, res) => {
    try {
        const { name, template } = req.body;
        const count = await messageModel.countDocuments({ campaign_name: name, open: "yes", template });
        res.status(200).send({ message: "Success", count });
    } catch (error) {
        // console.log(error);
        res.status(500).send('Getting CampaignTemplateOpenController mails went wrong');
    }
}
export const getCampaignTemplateClickController = async (req, res) => {
    try {
        const { name, template } = req.body;
        const count = await messageModel.countDocuments({ campaign_name: name, click: "yes", template });
        res.status(200).send({ message: "Success", count });
    } catch (error) {
        // console.log(error);
        res.status(500).send('Getting CampaignTemplateOpenController mails went wrong');
    }
}

export const getCampaignAndTemplatesController = async (req, res) => {
    try {
        const { campaign_name, templates } = req.body;
        const data1 = [];
        const data2 = [];
        const labelss = [];
        let ind = 0;
        for (const t of templates) {
            const countopen = await messageModel.countDocuments({ campaign_name, open: "yes", template: t });
            data1.push(countopen);
            const countclick = await messageModel.countDocuments({ campaign_name, click: "yes", template: t });
            data2.push(countclick);
            labelss.push(String.fromCharCode(65 + ind));
            ind++;
        }
        res.status(200).send({ data1, data2, labelss });
    } catch (error) {
        // console.log(error);
        res.status(500).send('Getting getCampaignAndTemplatesController mails went wrong');
    }
}