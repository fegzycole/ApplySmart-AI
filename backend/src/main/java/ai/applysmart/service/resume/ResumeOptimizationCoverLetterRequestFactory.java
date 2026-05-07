package ai.applysmart.service.resume;

import ai.applysmart.dto.coverletter.CoverLetterRequest;
import ai.applysmart.dto.resume.OptimizeCoverLetterRequest;
import ai.applysmart.dto.resume.OptimizeResumeRequest;
import ai.applysmart.entity.Resume;
import ai.applysmart.util.TextUtils;
import org.springframework.stereotype.Component;

@Component
public class ResumeOptimizationCoverLetterRequestFactory {

    private final ResumeOptimizationCoverLetterTargetResolver targetResolver;

    public ResumeOptimizationCoverLetterRequestFactory(ResumeOptimizationCoverLetterTargetResolver targetResolver) {
        this.targetResolver = targetResolver;
    }

    public CoverLetterRequest build(OptimizeResumeRequest request, Resume optimizedResume) {
        OptimizeCoverLetterRequest coverLetterOptions = request.getCoverLetter();
        if (coverLetterOptions == null || !coverLetterOptions.isEnabled()) {
            return null;
        }

        ResumeOptimizationJobTarget target = targetResolver.resolve(request.getJobDescription());

        CoverLetterRequest coverLetterRequest = new CoverLetterRequest();
        coverLetterRequest.setCompany(target.company());
        coverLetterRequest.setPosition(target.position());
        coverLetterRequest.setJobDescription(request.getJobDescription());
        coverLetterRequest.setTone(TextUtils.trimToNull(coverLetterOptions.getTone()));
        coverLetterRequest.setHighlights(TextUtils.trimToNull(coverLetterOptions.getHighlights()));
        coverLetterRequest.setResumeId(optimizedResume.getId());
        return coverLetterRequest;
    }
}
