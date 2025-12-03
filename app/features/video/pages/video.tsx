import YouTube from "react-youtube";
import { Badge } from "~/common/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";

export default function Video() {
  const playerOptions = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  } as const;

  const handlePlayerReady = (_event: any) => {};

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            영상 수업 미리보기
          </h1>
          <p className="text-muted-foreground mt-1">
            곧 공개될 동영상 수업을 통해 학습이 진행됩니다.
          </p>
        </div>
        <Badge variant="secondary">Preview</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>샘플 강의</CardTitle>
          <CardDescription>
            실제 서비스에서는 주차별로 강의가 업로드됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg overflow-hidden border bg-muted/30">
            <div className="relative w-full pt-[56.25%]">
              <div className="absolute inset-0">
                <YouTube
                  videoId="1e0JReBbrXU"
                  opts={playerOptions}
                  onReady={handlePlayerReady}
                  iframeClassName="w-full h-full"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-md bg-muted p-3">
              <div className="text-muted-foreground">진행 방식</div>
              <div className="font-medium mt-1">주차별 영상 업로드</div>
            </div>
            <div className="rounded-md bg-muted p-3">
              <div className="text-muted-foreground">학습 자료</div>
              <div className="font-medium mt-1">예제/과제 함께 제공</div>
            </div>
            <div className="rounded-md bg-muted p-3">
              <div className="text-muted-foreground">시청 환경</div>
              <div className="font-medium mt-1">모바일/PC 모두 지원</div>
            </div>
          </div>

          <div className="flex items-center justify-end mt-6">
            <Button variant="secondary" disabled>
              준비 중
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
