describe('test javascript stuff', () => {
    const xpath = require('xpath');
    const DOMParser = require('xmldom').DOMParser;

    const responseData = [
        {
            responseXML : '<TXLife>    <TXLifeResponse>        <TransResult>            <ResultCode tc=\"299292929\">Success with information</ResultCode>            <OLifEExtension>                <NgResponse Requestor=\"Svc4auratest\" RuleService=\"RX\" RuleVersion=\"015.170.028 (000.000.206)\" TransactionId=\"b5695ace-c41f-45c6-bac1-709bcfbe6770\">                    <Insureds>                        <Insured Gender=\"F\" Id=\"Party_168F2ED1-A716-5F05-F0F4-7F837CD4F569\" Name=\"\">                            <OverallDecisions>                                <HighestRiskSeverity>4</HighestRiskSeverity>                                <Decision Material=\"true\" Product=\"Life\" ProductId=\"Coverage_1\">                                    <UnderwritingDecision Decision=\"RUW\"/>                                    <TotalDebits>0.0</TotalDebits>                                </Decision>                            </OverallDecisions>                            <MibReporting/>                            <RequirementConsolidation/>                            <Risks>                                <Risk Alias=\"Hydrocodone-Acetaminophen - 40162\" Code=\"Hydrocodone-Acetaminophen - 40162\" Medical=\"true\" Name=\"Hydrocodone-Acetaminophen - 40162\" Severity=\"4\" Type=\"Analgesics - Opioid\">                                    <Decision Material=\"false\" Product=\"Life\" ProductId=\"Coverage_1\">                                        <UnderwritingDecision Decision=\"ACC\"/>                                        <TotalDebits>0.0</TotalDebits>                                    </Decision>                                </Risk>                                <Risk Alias=\"Periogard - 34068\" Code=\"Periogard - 34068\" Medical=\"true\" Name=\"Periogard - 34068\" Severity=\"0\" Type=\"Mouth/Throat/Dental Agents\">                                    <Decision Material=\"true\" Product=\"Life\" ProductId=\"Coverage_1\">                                        <UnderwritingDecision Decision=\"RUW\"/>                                        <TotalDebits>0.0</TotalDebits>                                    </Decision>                                </Risk>                                <Risk Alias=\"Penicillin V Potassium - 16513\" Code=\"Penicillin V Potassium - 16513\" Medical=\"true\" Name=\"Penicillin V Potassium - 16513\" Severity=\"0\" Type=\"Penicillins\">                                    <Decision Material=\"true\" Product=\"Life\" ProductId=\"Coverage_1\">                                        <UnderwritingDecision Decision=\"RUW\"/>                                        <TotalDebits>0.0</TotalDebits>                                    </Decision>                                </Risk>                            </Risks>                            <Reference>                                <Drugs>                                    <Drug DDI=\"40162\" Name=\"Hydrocodone-Acetaminophen\">                                        <ProviderDrug NDC=\"00406035705\" Name=\"HYDROCODONE-APAP 5-500 TABLET\"/>                                    </Drug>                                    <Drug DDI=\"34068\" Name=\"Periogard\">                                        <ProviderDrug NDC=\"00126027116\" Name=\"PERIOGARD 0.12% ORAL RINSE\"/>                                    </Drug>                                    <Drug DDI=\"16513\" Name=\"Penicillin V Potassium\">                                        <ProviderDrug NDC=\"00093117201\" Name=\"PENICILLIN VK 250 MG TABLET\"/>                                    </Drug>                                </Drugs>                            </Reference>                        </Insured>                    </Insureds>                    <TranslationLookup/>                </NgResponse>            </OLifEExtension>        </TransResult>        <TransRefGUID>b5695ace-c41f-45c6-bac1-709bcfbe6770</TransRefGUID>        <TransType tc=\"160010\">Black Box</TransType>        <TransMode tc=\"2\">Original</TransMode>        <TransExeDate>2020-04-15</TransExeDate>        <TransExeTime>17:05:23-05:00</TransExeTime>    </TXLifeResponse></TXLife>',
            successPath : '//TXLife/TXLifeResponse/TransResult/ResultCode/@tc',
            values : '1'
        },
        {
            responseXML : '<IntelRX><IntelRXResponse><Result>3495u340953</Result></IntelRXResponse></IntelRX>',
            successPath : '//IntelRX/IntelRXResponse/Result/text()',
            values : '1'
        },
        ]

    it('test additionalConditions', async () => {
        for (const data of responseData)
        {
            validateOptions(data.responseXML,data.successPath)
        }
    });

    function validateOptions(responseStr : string , condtionStr : string)
    {
        const namespaceRemovedStr = responseStr.replace(/xmlns=\"(.*?)\"/g, '');
        const parser = new DOMParser();
        const response = parser.parseFromString(namespaceRemovedStr, 'text/xml');

        const value = xpath.select1(condtionStr, response)?.nodeValue;
        console.log(`validateOptions ==>> value : ${value}`)
    }
});
